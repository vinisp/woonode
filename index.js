const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

const WooCommerce = new WooCommerceRestApi({
  url: "https://lojavirtual.vinicius-aragao.com/",
  consumerKey: "ck_746a1c3ace0b0d688d00e423a4e56e206fe7f756",
  consumerSecret: "cs_cce85bfd1d842b2854d0ca656a746fa403a18702",
  version: "wc/v3",
  queryStringAuth: true,
});

const ProdutoViaNode = {
  name: "Camiseta Bacana",
  type: "simple",
  regular_price: "80.20",
  description: "Camisa das mais melhores de boa",
  shor_description: "Uma camisa",
  categories: [
    {
      id: 99,
    },
    {
      id: 24,
    },
  ],
  images: [
    {
      src: "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_front.jpg",
    },
    {
      src: "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_2_back.jpg",
    },
  ],
};

const createProduct = () =>
  WooCommerce.post("products", ProdutoViaNode)
    .then((response) => {
      console.log(response.ProdutoViaNode);
    })
    .catch((error) => {
      console.log(error.response.data);
    });

const showAllData = () =>
  WooCommerce.get("products")
    .then((response) => {
      console.log(response.data);
      app.get("/", (req, res) => {
        res.json(response.data);
      });
    })
    .catch((error) => {
      console.log(error.response.data);
    });

app.listen(PORT, () => {
  console.info(PORT);
});
