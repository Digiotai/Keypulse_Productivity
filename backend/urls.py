from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('<str:UploadType>/FileUpload', views.uploadFile, name='FileUpload'),
    path('<str:DownoladType>/getData', views.getData, name='getData')
]
