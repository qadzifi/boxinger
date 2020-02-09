from django.shortcuts import render, redirect
import requests

# Create your views here.

def game(request, room_id = None):
    """TODO: Docstring for game.
    :returns: TODO
    """

    room_id = request.session.get('room_id')
    if room_id:
        del request.session['room_id']
    else:
        room_id = requests.get('https://www.uuidgenerator.net/api/version4').text.strip().replace('-','')

    return render(request, 'tetris/game.html', context = {
        'tetris' : 'active',
        'room_id' : room_id,
        })

def join(request):
    if request.method == 'GET':
        _room_id = request.GET.get('room_id')
        request.session['room_id'] = _room_id

    return redirect('tetris:game')
