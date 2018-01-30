class Slide < ApplicationRecord
  validates :image, presence: true, allow_nil: true
  mount_uploader :image, ImageUploader
  scope :activated, ->{ where(status: true) }

  def self.search_by_title(term)
    if term
      where('title LIKE ?', "%#{term}%")
    else
      all
    end
  end
end
