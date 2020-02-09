from django.urls import path, re_path
from . import views

app_name = 'tetris'

urlpatterns = [
    path('', views.game, name='game'),
    path('join/', views.join, name='join'),
]
