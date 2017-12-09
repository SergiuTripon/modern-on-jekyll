# source: http://mrloh.se/2015/06/automatic-archives-for-jekyll-on-github-pages/

month_names = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

def write_template_file(path, permalink, title, options={})
    unless File.exists?(path)
        File.open(path, 'w') do |f|
            f.puts "---"
            f.puts "type: archive"
            f.puts "layout: archive"
            f.puts "permalink: #{permalink}"
            f.puts "title: '#{title}'"
            options.each do |k, v|
                f.puts "#{k}: #{v}"
            end
            f.puts "---"
        end
        puts "created archive page for #{title}"
    end
end

########################################################################################################################

# create dates, categories and tags folders
dates_folder_path = File.expand_path("../dates/", __FILE__)
Dir.mkdir(dates_folder_path) unless File.exists?(dates_folder_path)
categories_folder_path = File.expand_path("../categories/", __FILE__)
Dir.mkdir(categories_folder_path) unless File.exists?(categories_folder_path)
tags_folder_path = File.expand_path("../tags/", __FILE__)
Dir.mkdir(tags_folder_path) unless File.exists?(tags_folder_path)

# read dates into array
dates = []
date_list_path = File.expand_path("../../_site/archive/date_list.txt", __FILE__)
File.open(date_list_path, 'r') do |f|
    while date = f.gets
        date = date.strip
        dates += [{year: date[0..3], month: date[5..6], day: date[8..9]}] unless date == "" || date == "\n"
    end
end
# read categories into array
categories = []
category_list_path = File.expand_path("../../_site/archive/category_list.txt", __FILE__)
File.open(category_list_path, 'r') do |f|
    while category = f.gets
        category = category.strip
        categories += [category] unless category == "" || category == "\n"
    end
end
# read tags into array
tags = []
tag_list_path = File.expand_path("../../_site/archive/tag_list.txt", __FILE__)
File.open(tag_list_path, 'r') do |f|
    while tag = f.gets
        tag = tag.strip
        tags += [tag] unless tag == "" || tag == "\n"
    end
end

########################################################################################################################

# create template files for each year, month and day
for date in dates
    year_page_path = dates_folder_path + "/#{date[:year]}.md"
    write_template_file(year_page_path, "archive/#{date[:year]}/", "Posted in: #{date[:year]}", {year:"#{date[:year]}"})

    month_page_path = dates_folder_path + "/#{date[:year]}-#{date[:month]}.md"
    month_name = "#{month_names[date[:month].to_i]} #{date[:year]}"
    write_template_file(month_page_path, "archive/#{date[:year]}/#{date[:month]}/", "Posted in: #{month_name}", {year: date[:year], month: date[:month]})

    day_page_path = dates_folder_path + "/#{date[:year]}-#{date[:month]}-#{date[:day]}.md"
    day_name = "#{date[:day]} #{month_names[date[:month].to_i]} #{date[:year]}"
    write_template_file(day_page_path, "archive/#{date[:year]}/#{date[:month]}/#{date[:day]}/", "Posted on: #{day_name}", {year: date[:year], month: date[:month], day: date[:day]})
end
# create template files for each category
for category in categories
    category_path = category.include?(' ') ? category.downcase.gsub!(' ','-') : category.downcase
    category_page_path = categories_folder_path + "/#{category_path}.md"
    write_template_file(category_page_path, "archive/categories/#{category_path}/", "Categorised with: #{category}", {category: category})
end
# create template files for each tag
for tag in tags
    tag_path = tag.include?(' ') ? tag.downcase.gsub!(' ','-') : tag.downcase
    tag_page_path = tags_folder_path + "/#{tag_path}.md"
    write_template_file(tag_page_path, "archive/tags/#{tag_path}/", "Tagged with: #{tag}", {tag: tag})
end