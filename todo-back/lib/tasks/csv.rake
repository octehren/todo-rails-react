namespace :csv do
    desc "Exports current event data to a csv file: "

    task export: [:environment] do
        require 'csv'
        filename = "event_status_#{DateTime.now.to_i}"
        events = Event.all.order(:username)

        CSV.open("#{filename}.csv", "w") do |csv|
            csv << ["Username", "Hex Color", "Message", "Time of registration"]
            events.each do |e|
                csv << [e.get_todo_username, e.color, e.message, e.created_at]
            end
        end
        puts "Data exported to #{filename}.csv in the current directory"
    end
end
