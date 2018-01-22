class Category < ApplicationRecord
  has_many :products, dependent: :destroy
  validates :title, presence: true
  validates :type, presence: true
end
