document.addEventListener("DOMContentLoaded", function () {
  fetch(
    "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json"
  )
    .then((response) => response.json())
    .then((data) => {
      const menuItems = data;

      const menuContainer = document.getElementById("menu-container");

      menuItems.forEach((item) => {
        const menuItem = document.createElement("div");
        menuItem.className = "menu-item";

        const itemName = document.createElement("h2");
        itemName.textContent = item.name;

        const itemPrice = document.createElement("p");
        itemPrice.textContent = `Price: $${item.price}/-`;

        const itemImage = document.createElement("img");
        itemImage.src = item.imgSrc;
        itemImage.alt = item.name;
        menuItem.appendChild(itemImage);
        menuItem.appendChild(itemName);
        menuItem.appendChild(itemPrice);

        menuContainer.appendChild(menuItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching JSON:", error);
    });
});

function takeOrder() {
  return new Promise((resolve, reject) => {

    const selectedBurgers = [
      { name: "cheeseBurger", price: "$5.99" },
      { name: "VegBurger", price: "$7.99" },
      { name: "NonVegBurger", price: "$10.99" },
    ];

    setTimeout(() => {
      if (selectedBurgers.length === 3) {
        resolve(selectedBurgers);
      } else {
        reject(new Error("Not enough burgers selected."));
      }
    }, 2500);
  });
}

function orderPrep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: false });
    }, 1500);
  });
}

function payOrder() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ order_status: true, paid: true });
    }, 1000);
  });
}

async function thankyouFnc() {
  try {
    const selectedBurgers = await takeOrder();
    console.log("Burgers selected:", selectedBurgers);

    const prepStatus = await orderPrep();
    console.log("Order prepared:", prepStatus);

    const paymentStatus = await payOrder();
    console.log("Payment status:", paymentStatus);

    if (paymentStatus.paid) {
      alert("Thank you for eating with us today!");
    }
  } catch (error) {
    console.error(error);
  }
}

thankyouFnc();
