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
    self.status = true
    self.save
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

end
