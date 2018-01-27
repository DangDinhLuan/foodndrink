class Slide < ApplicationRecord
  validates :image, presence: true, allow_nil: true
  mount_uploader :image, ImageUploader
end
