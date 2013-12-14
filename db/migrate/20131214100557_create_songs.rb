class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.string :title
      t.string :link
      t.text :desc

      t.timestamps
    end
  end
end
