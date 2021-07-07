module Types
  class ShopType < Types::BaseObject
    field :id, ID, null: false
    field :shopify_domain, String, null: false
    field :legal_agreement, Boolean, null: false
    field :connected, Boolean, null: false
    field :approved, Boolean, null: false
    field :rejected, Boolean, null: false
    field :rejected_reason, String, null: true
    field :bank_detail_updated_at, String, null: true
  end
end
