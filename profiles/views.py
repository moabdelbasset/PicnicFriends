from typing import Any, Optional
from django.db import models
from django.views.generic import TemplateView, UpdateView
from django.contrib.auth.mixins import UserPassesTestMixin, LoginRequiredMixin

from .models import Profile
from .forms import ProfileForm


class ProfileView(TemplateView):
    """User Profile View"""

    template_name = "profiles/profile.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['profile'] = Profile.objects.get(user_id=self.kwargs['pk'])
        context['form'] = ProfileForm(instance=context['profile'])
        return context


    # def get_context_data(self, **kwargs):
    #     profile = Profile.objects.get(user=self.kwargs["pk"])
    #     context = {
    #         "profile": profile,
    #         'form': ProfileForm(instance=profile)
    #     }

    #     return context
    


# class EditProfile(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
#     """Edit a profile"""

#     form_class = ProfileForm
#     model = Profile

#     def form_valid(self, form):
#         self.success_url = f'/profiles/user/{self.kwargs["pk"]}/'
#         return super().form_valid(form)
    
#     def test_func(self):
#         return self.request.user == self.get_object().user


class EditProfile(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    """Edit a profile"""

    form_class = ProfileForm
    model = Profile
    template_name = 'profiles/profile.html' # Ensure this is the correct template name

    def get_object(self, queryset=None):
        """This method is to get the user profile based on the user's id (not the profile id)"""
        user_id = self.kwargs.get('pk')
        return Profile.objects.get(user__id=user_id)

    def form_valid(self, form):
        self.success_url = f'/profile/user/{self.kwargs["pk"]}/'
        #self.success_url = f'/profile/user/{self.request.user.id}/'
        return super().form_valid(form)
    
    def test_func(self):
        return self.request.user == self.get_object().user
        #return self.request.user == self.profile.user