from . import views
from django.urls import path

urlpatterns = [
    path("api/types/", views.types_api),
    path("api/types/<str:pk>/", views.modify_types),
    path("api/property/", views.properties_api),
    path("api/property/sold/", views.sold_properties),
    path("api/property/sell/", views.toggle_sold),
    path("api/property/my/", views.get_my_properties),
    path("api/property/filter/", views.get_filtered_properties),
    path("api/property/<str:pk>/", views.property_detail_api),
]
