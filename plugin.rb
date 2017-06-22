# name: discourse-user-charts
# about: A plugin to add charts of user activity to a user profile.
# version: 0.1
# author: Joe Buhlig joebuhlig.com
# url: https://www.github.com/joebuhlig/discourse-user-charts

enabled_site_setting :user_charts_enabled

register_asset "stylesheets/discourse-user-charts.scss"

load File.expand_path('../lib/discourse_user_charts/engine.rb', __FILE__)