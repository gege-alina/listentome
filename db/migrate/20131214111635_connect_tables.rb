class ConnectTables < ActiveRecord::Migration
  def change
    create_table :user_songs do |t|
      t.belongs_to :user
      t.belongs_to :song
      t.integer :boost
      t.timestamps
    end
  end
end
