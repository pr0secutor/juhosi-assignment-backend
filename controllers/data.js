const { db } = require("../database");
const { Success, AppError } = require("../utils");

const createOrder = (req, res) => {
  const {
    created_by,
    order_date,
    company,
    owner,
    item,
    quantity,
    weight,
    request,
    tracking_id,
    shipment_size,
    box_count,
    specification,
    checklist_quantity,
  } = req.body;
  db.query(
    `INSERT INTO orders (id, created_by, order_date, company, owner, item, quantity, weight, request, tracking_id, shipment_size, box_count, specification, checklist_quantity)
     VALUES (NULL, "${created_by}", "${order_date}", "${company}", "${owner}", "${item}", "${quantity}", "${weight}", "${request}", "${tracking_id}", "${shipment_size}", "${box_count}", "${specification}", "${checklist_quantity}")`,
    async (error, result) => {
      console.log(result);
      if (error) {
        console.log(error);
        return res.status(409).json(AppError("Order could not be created..."));
      }
      return res.status(200).json(Success("Order created..."));
    }
  );
};

const fecthData = async (req,res) => {
  db.query("SELECT orders.created_by,SUM(orders.quantity),SUM(orders.weight),SUM(orders.box_count) FROM orders GROUP BY orders.created_by", async(error,result) => {
    return res.status(200).json(Success("Data fetched...",undefined,result));
  })
}

module.exports = { createOrder,fecthData };
