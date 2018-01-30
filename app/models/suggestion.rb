class Suggestion < ApplicationRecord
  belongs_to :user
  belongs_to :category
  validates :user_id, presence: true
  validates :category_id, presence: true
  validates :title, presence: true,
    length: {maximum: Settings.validates.title.length.maximum}
  validates :image, presence: true
  mount_uploader :image, ImageUploader
  validates :description, presence: true
  validates :price, presence: true

  scope :suggestion_user, -> (id) { where(user_id: id).order(created_at: :desc) }
  
  def excerp
    self.description.truncate Settings.product.description.excerp, separator: /\s/
  end

  def accept
    sefl.status = true
    sefl.save
  end

  def accepted?
    self.status
  end

  def status_suggestion
    if self.status
      I18n.t("user_profile.suggestions.accept")
    else
      I18n.t("user_profile.suggestions.refuse")
    end
  end

  def self.search_by_title(term)
    if term
      where('title LIKE ?', "%#{term}%")
    else
      all
    end
  end

end
