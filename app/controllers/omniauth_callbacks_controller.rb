class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
   def facebook
    @user = User.find_for_facebook_oauth(request.env["omniauth.auth"], current_user)
    @user.last_name = request.env["omniauth.auth"][:extra][:raw_info][:last_name]
    @user.first_name = request.env["omniauth.auth"][:extra][:raw_info][:first_name]
    @user.url = request.env["omniauth.auth"][:extra][:raw_info][:link]
    if @user.persisted?
      sign_in_and_redirect @user, :event => :authentication #this will throw if @user is not activated
      set_flash_message(:notice, :success, :kind => "Facebook") if is_navigational_format?
    else
      session["devise.facebook_data"] = request.env["omniauth.auth"]
      redirect_to root_path
    end
  end
 end