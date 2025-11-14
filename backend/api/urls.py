from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenBlacklistView

from api.views import RegistrationView, EntryListView, EntryCreateView, EntryUpdateView, EntryDeleteView, StatisticsView

urlpatterns = [
    path('register/', RegistrationView.as_view(), name='register'),
    path('entries/', EntryListView.as_view(), name='entries-list'),
    path('entries/create/', EntryCreateView.as_view(), name='entries-create'),
    path('entries/delete/<int:pk>/', EntryDeleteView.as_view(), name='entries-delete'),
    path('entries/update/<int:pk>/', EntryUpdateView.as_view(), name='entries-update'),
    path('statistics/', StatisticsView.as_view(), name='statistics'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/blacklist/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
