from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('<str:kpi>/FileUpload', views.uploadFile, name='FileUpload'),
    path('<str:kpi>/getData', views.getData, name='getData'),
path('<str:kpi>/getfiles', views.get_files, name='getfiles'),
path('<str:kpi>/download/', views.download_data, name='download'),
]
