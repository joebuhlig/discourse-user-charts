require 'date'

module DiscourseUserCharts
  class Engine < ::Rails::Engine
    isolate_namespace DiscourseUserCharts

    config.after_initialize do
      require_dependency 'user'
      class ::User
        def user_activity_chart_data
          user_activity_chart_data = []
          likes = self.custom_fields["user_activity_chart_likes"].nil? ? [] : JSON.parse(self.custom_fields["user_activity_chart_likes"])["likes"]
          posts = self.custom_fields["user_activity_chart_posts"].nil? ? [] : JSON.parse(self.custom_fields["user_activity_chart_posts"])["posts"]
          topics = self.custom_fields["user_activity_chart_topics"].nil? ? [] : JSON.parse(self.custom_fields["user_activity_chart_topics"])["topics"]
          user_field_one = UserField.find_by(:name => SiteSetting.user_charts_custom_field_one_name)
          user_field_two = UserField.find_by(:name => SiteSetting.user_charts_custom_field_two_name)
          user_field_three = UserField.find_by(:name => SiteSetting.user_charts_custom_field_three_name)
          custom_field_one = user_field_one.nil? ? [] : JSON.parse(self.user_fields[user_field_one.id.to_s])["data"]
          custom_field_two = user_field_two.nil? ? [] : JSON.parse(self.user_fields[user_field_two.id.to_s])["data"]
          custom_field_three = user_field_three.nil? ? [] : JSON.parse(self.user_fields[user_field_three.id.to_s])["data"]

          for i in 0..364
            likes_point = likes.empty? ? 0 : (likes[i] * SiteSetting.user_charts_likes_multiplier)
            posts_point = posts.empty? ? 0 : (posts[i] * SiteSetting.user_charts_posts_multiplier)
            topics_point = topics.empty? ? 0 : (topics[i] * SiteSetting.user_charts_topics_multiplier)
            data_point = likes_point + posts_point + topics_point
            if SiteSetting.user_charts_custom_field_one_enabled
              custom_field_one_point = custom_field_one[i].blank? ? 0 : (custom_field_one[i] * SiteSetting.user_charts_custom_field_one_multiplier)
              data_point += custom_field_one_point
            end
            if SiteSetting.user_charts_custom_field_two_enabled
              custom_field_two_point = custom_field_two[i].blank? ? 0 : (custom_field_two[i] * SiteSetting.user_charts_custom_field_two_multiplier)
              data_point += custom_field_two_point
            end
            if SiteSetting.user_charts_custom_field_three_enabled
              custom_field_three_point = custom_field_three[i].blank? ? 0 : (custom_field_three[i] * SiteSetting.user_charts_custom_field_three_multiplier)
              data_point += custom_field_three_point
            end
            user_activity_chart_data.push(data_point)
          end
          user_activity_chart_data
        end
      end

      require_dependency 'user_serializer'
      class ::UserSerializer
        attributes :user_activity_chart_data

        def user_activity_chart_data
          object.user_activity_chart_data
        end

      end

  		Discourse::Application.routes.append do
  			mount ::DiscourseUserCharts::Engine, at: "/charts"
  		end

      module ::Jobs
        class UserActivityChartData < Jobs::Scheduled
          every 1.days

          def execute(args)
            users = User.real
            users.each do |user|
              if user.custom_fields["user_activity_chart_likes"]
                likes = JSON.parse(user.custom_fields["user_activity_chart_likes"])
                if Time.parse(likes["update_time"]) < Time.now.utc.beginning_of_day
                  time = Time.now.utc
                  likes["update_time"] = time.to_s
                  likes_data = likes["likes"]
                  start_time = Time.parse(likes["update_time"])
                  start_date = Date.new(start_time.year, start_time.mon, start_time.day)
                  end_time = time - 1.day
                  end_date = Date.new(end_time.year, end_time.mon, end_time.day)
                  (start_date..end_date).each do |date|
                    likes = UserAction.where(user_id: user.id, action_type: 1).where('created_at BETWEEN ? AND ?', date.beginning_of_day, date.end_of_day).count || 0
                    likes_data.unshift(likes)
                  end
                  user.custom_fields["user_activity_chart_likes"] = JSON.generate(likes)
                  user.save
                end
              else
                time = Time.now.utc
                likes_wrapper = {update_time: time.to_s}
                likes_data = []
                start_time = time - 1.year
                start_date = Date.new(start_time.year, start_time.mon, start_time.day)
                end_time = time - 1.day
                end_date = Date.new(end_time.year, end_time.mon, end_time.day)
                (start_date..end_date).each do |date|
                  likes = UserAction.where(user_id: user.id, action_type: 1).where('created_at BETWEEN ? AND ?', date.beginning_of_day, date.end_of_day).count || 0
                  likes_data.unshift(likes)
                end
                likes_wrapper[:likes] = likes_data
                user.custom_fields["user_activity_chart_likes"] = JSON.generate(likes_wrapper)
                user.save
              end

              if user.custom_fields["user_activity_chart_posts"]
                posts = JSON.parse(user.custom_fields["user_activity_chart_posts"])
                if Time.parse(posts["update_time"]) < Time.now.utc.beginning_of_day
                  time = Time.now.utc
                  posts["update_time"] = time.to_s
                  posts_data = posts["posts"]
                  start_time = Time.parse(posts["update_time"])
                  start_date = Date.new(start_time.year, start_time.mon, start_time.day)
                  end_time = time - 1.day
                  end_date = Date.new(end_time.year, end_time.mon, end_time.day)
                  (start_date..end_date).each do |date|
                    posts = UserAction.where(user_id: user.id, action_type: 5).where('created_at BETWEEN ? AND ?', date.beginning_of_day, date.end_of_day).count || 0
                    posts_data.unshift(posts)
                  end
                  user.custom_fields["user_activity_chart_posts"] = JSON.generate(posts)
                  user.save
                end
              else
                time = Time.now.utc
                posts_wrapper = {update_time: time.to_s}
                posts_data = []
                start_time = time - 1.year
                start_date = Date.new(start_time.year, start_time.mon, start_time.day)
                end_time = time - 1.day
                end_date = Date.new(end_time.year, end_time.mon, end_time.day)
                (start_date..end_date).each do |date|
                  posts = UserAction.where(user_id: user.id, action_type: 5).where('created_at BETWEEN ? AND ?', date.beginning_of_day, date.end_of_day).count || 0
                  posts_data.unshift(posts)
                end
                posts_wrapper[:posts] = posts_data
                user.custom_fields["user_activity_chart_posts"] = JSON.generate(posts_wrapper)
                user.save
              end

              if user.custom_fields["user_activity_chart_topics"]
                topics = JSON.parse(user.custom_fields["user_activity_chart_topics"])
                if Time.parse(topics["update_time"]) < Time.now.utc.beginning_of_day
                  time = Time.now.utc
                  topics["update_time"] = time.to_s
                  topics_data = topics["topics"]
                  start_time = Time.parse(topics["update_time"])
                  start_date = Date.new(start_time.year, start_time.mon, start_time.day)
                  end_time = time - 1.day
                  end_date = Date.new(end_time.year, end_time.mon, end_time.day)
                  (start_date..end_date).each do |date|
                    topics = UserAction.where(user_id: user.id, action_type: 4).where('created_at BETWEEN ? AND ?', date.beginning_of_day, date.end_of_day).count || 0
                    topics_data.unshift(topics)
                  end
                  user.custom_fields["user_activity_chart_topics"] = JSON.generate(topics)
                  user.save
                end
              else
                time = Time.now.utc
                topics_wrapper = {update_time: time.to_s}
                topics_data = []
                start_time = time - 1.year
                start_date = Date.new(start_time.year, start_time.mon, start_time.day)
                end_time = time - 1.day
                end_date = Date.new(end_time.year, end_time.mon, end_time.day)
                (start_date..end_date).each do |date|
                  topics = UserAction.where(user_id: user.id, action_type: 4).where('created_at BETWEEN ? AND ?', date.beginning_of_day, date.end_of_day).count || 0
                  topics_data.unshift(topics)
                end
                topics_wrapper[:topics] = topics_data
                user.custom_fields["user_activity_chart_topics"] = JSON.generate(topics_wrapper)
                user.save
              end


            end
          end

        end
      end

    end

  end
end