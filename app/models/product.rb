class Product < ApplicationRecord
  belongs_to :category
  has_many :items
  has_many :ratings, dependent: :destroy
  has_many :comments, dependent: :destroy
  validates :category_id, presence: true
  validates :title, presence: true, length: {maximum: Settings.validates.title.length.maximum}
  validates :description, presence: true
  validates :image, presence: true
  validates :price, presence: true
  validates :unit, presence: true
  validates :quantity, presence: true
  
end
