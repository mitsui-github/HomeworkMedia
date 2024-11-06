class AddContentToUploads < ActiveRecord::Migration[6.1]
  def change
    add_column :uploads, :content, :text
  end
end
