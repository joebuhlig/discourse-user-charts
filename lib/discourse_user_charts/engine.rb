module DiscourseUserCharts
  class Engine < ::Rails::Engine
    isolate_namespace DiscourseUserCharts

    config.after_initialize do
  		Discourse::Application.routes.append do
  			mount ::DiscourseUserCharts::Engine, at: "/charts"
  		end
    end

  end
end