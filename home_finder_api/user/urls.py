from django.urls import path, include
from . import views

urlpatterns = [
    path('api/user/register/',views.register_user),
    path('api/user/get-verification/',views.get_verification),
    path('api/user/verify/',views.verify),
    # path('api/superize',views.superize)
]
