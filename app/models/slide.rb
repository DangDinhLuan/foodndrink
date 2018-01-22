class Slide < ApplicationRecord
  validates :link, presence: true
  validates :image, presence: true
  
end
