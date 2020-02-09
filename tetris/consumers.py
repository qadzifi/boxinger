from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
import json

class GameConsumer(WebsocketConsumer):
    def connect(self):
        self.room_id = self.scope['url_route']['kwargs']['room_id']
        self.room_group_id = 'game_%s' % self.room_id

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_id,
            self.channel_name
        )

        self.accept()

    def disconnect(self, code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_id,
            self.channel_name
        )

    def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_id,
            {
                'type': 'game_update',
                'message': message
            }
        )

    # Receive message from room group
    def game_update(self, event):
        message = event['message']

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message
        }))

