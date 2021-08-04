class ProductListingsRemoveJob < ActiveJob::Base
  def perform(shop_domain:, webhook:)
    shop = Shop.find_by(shopify_domain: shop_domain)

    if shop.nil?
      logger.error("#{self.class} failed: cannot find shop with domain '#{shop_domain}'")
      return
    end

    shop.with_shopify_session do
      shopify_product_id = webhook.dig('product_listing', 'product_id')
      Product.find_by(shopify_product_id: shopify_product_id).destroy
    end
  end
end