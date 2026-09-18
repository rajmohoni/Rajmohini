(function () {
  "use strict";

  /* =========================================================
     PRODUCT SETTINGS
  ========================================================= */

  const PRICE = 991;

  let quantity = 1;
  let selectedSize = "";


  /* =========================================================
     HELPER FUNCTIONS
  ========================================================= */

  function bnNumber(number) {
    return Number(number).toLocaleString("bn-BD");
  }

  function money(number) {
    return "৳ " + bnNumber(number);
  }

  function getElement(id) {
    return document.getElementById(id);
  }


  /* =========================================================
     COUNTDOWN
  ========================================================= */

  let totalSeconds = (5 * 3600) + (47 * 60) + 23;

  function updateCountdown() {
    const hoursEl = getElement("hours");
    const minutesEl = getElement("minutes");
    const secondsEl = getElement("seconds");

    if (!hoursEl || !minutesEl || !secondsEl) {
      return;
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");

    totalSeconds--;

    if (totalSeconds < 0) {
      totalSeconds = (5 * 3600) + (59 * 60) + 59;
    }
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);


  /* =========================================================
     NOTIFICATION POPUP
  ========================================================= */

  const notifications = [
    "রহিম সাহেব (ঢাকা) এইমাত্র অর্ডার করেছেন!",
    "করিম ভাই (চট্টগ্রাম) অর্ডার করেছেন!",
    "নাসরিন বেগম (সিলেট) অর্ডার করেছেন!",
    "জামাল সাহেব (রাজশাহী) অর্ডার করেছেন!",
    "সুমাইয়া (কুমিল্লা) এইমাত্র অর্ডার করেছেন!",
    "হাকিম সাহেব (খুলনা) এইমাত্র অর্ডার করেছেন!",
    "চান মিয়া (চট্টগ্রাম) অর্ডার করেছেন!",
    "হাবিবা খাতুন (সিলেট) অর্ডার করেছেন!",
    "রাজীব (রাজশাহী) অর্ডার করেছেন!",
    "হাবিবুর (কুমিল্লা) এইমাত্র অর্ডার করেছেন!"
  ];

  let notificationIndex = 0;

  const notificationPopup = getElement("notifPopup");
  const notificationMessage = getElement("notifMsg");

  function showNotification() {
    if (!notificationPopup || !notificationMessage) {
      return;
    }

    notificationMessage.textContent =
      notifications[notificationIndex % notifications.length];

    notificationIndex++;

    notificationPopup.classList.add("show");

    setTimeout(function () {
      notificationPopup.classList.remove("show");
    }, 4000);
  }

  if (notificationPopup && notificationMessage) {
    showNotification();
    setInterval(showNotification, 8000);
  }


  /* =========================================================
     PRODUCT GALLERY
  ========================================================= */

  const mainProductImage = getElement("mainProductImg");
  const thumbnails = document.querySelectorAll(".thumb-img");

  thumbnails.forEach(function (thumbnail) {
    thumbnail.addEventListener("click", function () {

      thumbnails.forEach(function (item) {
        item.classList.remove("active");
      });

      thumbnail.classList.add("active");

      if (
        mainProductImage &&
        thumbnail.dataset.img
      ) {
        mainProductImage.src = thumbnail.dataset.img;
      }

    });
  });


  /* =========================================================
     TAB SYSTEM
  ========================================================= */

  function activateTab(tabName) {

    document.querySelectorAll(".tab-btn").forEach(function (button) {

      button.classList.toggle(
        "active",
        button.dataset.tab === tabName
      );

    });

    document.querySelectorAll(".tab-panel").forEach(function (panel) {

      panel.classList.toggle(
        "d-none",
        panel.dataset.panel !== tabName
      );

    });

    if (tabName === "benefits") {

      const benefitsSection = getElement("benefits");

      if (benefitsSection) {
        benefitsSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

    }
  }


  document.querySelectorAll(".tab-btn").forEach(function (button) {

    button.addEventListener("click", function () {
      activateTab(button.dataset.tab);
    });

  });


  /* =========================================================
     BENEFITS NAVIGATION
  ========================================================= */

  document
    .querySelectorAll('a[href="#benefits"]')
    .forEach(function (link) {

      link.addEventListener("click", function (event) {

        event.preventDefault();

        activateTab("benefits");

        const tabsSection =
          document.querySelector(".tabs-section");

        if (tabsSection) {
          tabsSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }

      });

    });


  /* =========================================================
     RING SIZE
  ========================================================= */

  function setSize(size) {

    selectedSize = size || "";

    document.querySelectorAll(".size-btn").forEach(function (button) {

      button.classList.toggle(
        "active",
        button.dataset.size === selectedSize
      );

    });

    const sizeSelect = getElement("orderSize");

    if (sizeSelect) {
      sizeSelect.value = selectedSize;
    }

  }


  document.querySelectorAll(".size-btn").forEach(function (button) {

    button.addEventListener("click", function () {

      setSize(button.dataset.size);

    });

  });


  const orderSizeSelect = getElement("orderSize");

  if (orderSizeSelect) {

    orderSizeSelect.addEventListener(
      "change",
      function (event) {

        setSize(event.target.value);

      }
    );

  }


  /* =========================================================
     QUANTITY SYSTEM
  ========================================================= */

  function updateQuantity() {

    const totalPrice = PRICE * quantity;

    const qtyNum = getElement("qtyNum");
    const formQty = getElement("formQty");
    const formQtyNum = getElement("formQtyNum");
    const productQtyPrice = getElement("productQtyPrice");
    const formPrice = getElement("formPrice");
    const formQtyTotal = getElement("formQtyTotal");
    const hiddenQuantity = getElement("orderQuantity");

    if (qtyNum) {
      qtyNum.textContent = bnNumber(quantity);
    }

    if (formQty) {
      formQty.textContent = bnNumber(quantity);
    }

    if (formQtyNum) {
      formQtyNum.textContent = bnNumber(quantity);
    }

    if (productQtyPrice) {
      productQtyPrice.textContent =
        "মোট: " + money(totalPrice);
    }

    if (formPrice) {
      formPrice.textContent =
        money(totalPrice);
    }

    if (formQtyTotal) {
      formQtyTotal.textContent =
        "মোট: " + money(totalPrice);
    }

    /*
     * This value will be sent to WooCommerce.
     */
    if (hiddenQuantity) {
      hiddenQuantity.value = quantity;
    }
  }


  document.querySelectorAll("[data-qty]").forEach(function (button) {

    button.addEventListener("click", function () {

      const change = Number(button.dataset.qty);

      if (Number.isNaN(change)) {
        return;
      }

      quantity = quantity + change;

      /*
       * Minimum = 1
       * Maximum = 5
       */
      quantity = Math.max(1, quantity);
      quantity = Math.min(5, quantity);

      updateQuantity();

    });

  });


  updateQuantity();


  /* =========================================================
     FAQ ACCORDION
  ========================================================= */

  document
    .querySelectorAll(".faq-question")
    .forEach(function (button) {

      button.addEventListener("click", function () {

        const item = button.closest(".faq-item");

        if (!item) {
          return;
        }

        const wasOpen =
          item.classList.contains("open");


        /*
         * Close all open FAQ items
         */
        document
          .querySelectorAll(".faq-item.open")
          .forEach(function (openItem) {

            openItem.classList.remove("open");

            const openButton =
              openItem.querySelector(".faq-question");

            if (openButton) {

              openButton.classList.add("collapsed");

              openButton.setAttribute(
                "aria-expanded",
                "false"
              );

            }

          });


        /*
         * Open clicked item
         */
        if (!wasOpen) {

          item.classList.add("open");

          button.classList.remove("collapsed");

          button.setAttribute(
            "aria-expanded",
            "true"
          );

        }

      });

    });


  /* =========================================================
     DIRECT ORDER FORM
  ========================================================= */

  const orderForm = getElement("orderForm");
  const submitButton = getElement("submitOrderBtn");

  if (orderForm) {

    orderForm.addEventListener("submit", function (event) {

      /*
       * IMPORTANT:
       *
       * আমরা normal form POST ব্যবহার করছি।
       *
       * তাই valid হলে এখানে
       * event.preventDefault() ব্যবহার করা যাবে না।
       */


      /* -----------------------------------------------------
         Browser validation
      ----------------------------------------------------- */

      if (!orderForm.checkValidity()) {

        event.preventDefault();

        orderForm.reportValidity();

        return;

      }


      /* -----------------------------------------------------
         Update hidden quantity
      ----------------------------------------------------- */

      const hiddenQuantity =
        getElement("orderQuantity");

      if (hiddenQuantity) {
        hiddenQuantity.value = String(quantity);
      }


      /* -----------------------------------------------------
         Update selected size
      ----------------------------------------------------- */

      const sizeSelect =
        getElement("orderSize");

      if (sizeSelect) {
        sizeSelect.value = selectedSize;
      }


      /* -----------------------------------------------------
         Disable submit button
         Prevent accidental double order
      ----------------------------------------------------- */

      if (submitButton) {

        submitButton.disabled = true;

        submitButton.innerHTML =
          '<i class="fas fa-spinner fa-spin me-2"></i>' +
          'অর্ডার পাঠানো হচ্ছে...';

      }

      /*
       * NO preventDefault() here.
       *
       * Browser এখন automatically:
       *
       * POST
       * ↓
       * /wp-admin/admin-post.php
       *
       * করবে।
       */

    });

  }


  /* =========================================================
     SMOOTH SCROLL TO ORDER SECTION
  ========================================================= */

  document
    .querySelectorAll('a[href="#order"]')
    .forEach(function (link) {

      link.addEventListener("click", function (event) {

        event.preventDefault();

        const orderSection = getElement("order");

        if (orderSection) {

          orderSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }

      });

    });


  /* =========================================================
     SUCCESS PAGE HANDLER
  ========================================================= */

  const urlParams =
    new URLSearchParams(window.location.search);

  const orderStatus =
    urlParams.get("order");

  const orderId =
    urlParams.get("order_id");


  if (
    orderStatus === "success" &&
    orderId
  ) {

    const successMessage =
      getElement("orderSuccessMessage");

    const successOrderId =
      getElement("successOrderId");

    if (successOrderId) {

      successOrderId.textContent =
        "#" + orderId;

    }


    if (successMessage) {

      successMessage.classList.remove("d-none");

    }


    /*
     * Optional:
     * scroll to success message
     */

    if (successMessage) {

      setTimeout(function () {

        successMessage.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

      }, 300);

    }

  }


  /* =========================================================
     SUCCESS MESSAGE - OPTIONAL
  ========================================================= */

  /*
   * If you use the old success section,
   * these values can still be shown.
   */

  if (
    orderStatus === "success" &&
    orderId
  ) {

    const successName =
      getElement("successName");

    const successName2 =
      getElement("successName2");

    const successPhone =
      getElement("successPhone");

    const successAddress =
      getElement("successAddress");

    const successQty =
      getElement("successQty");

    const successTotal =
      getElement("successTotal");

    const customerName =
      sessionStorage.getItem("orderName");

    const customerPhone =
      sessionStorage.getItem("orderPhone");

    const customerAddress =
      sessionStorage.getItem("orderAddress");

    const customerQuantity =
      sessionStorage.getItem("orderQuantity");


    if (customerName) {

      if (successName) {
        successName.textContent =
          customerName;
      }

      if (successName2) {
        successName2.textContent =
          customerName;
      }

    }


    if (customerPhone && successPhone) {
      successPhone.textContent =
        customerPhone;
    }


    if (customerAddress && successAddress) {
      successAddress.textContent =
        customerAddress;
    }


    if (customerQuantity) {

      const qty =
        Number(customerQuantity);

      if (successQty) {
        successQty.textContent =
          bnNumber(qty);
      }

      if (successTotal) {
        successTotal.textContent =
          money(PRICE * qty);
      }

    }

  }


  /* =========================================================
     SAVE CUSTOMER DATA BEFORE SUBMIT
     ========================================================= */

  if (orderForm) {

    orderForm.addEventListener("submit", function () {

      const nameInput =
        getElement("orderName");

      const phoneInput =
        getElement("orderPhone");

      const addressInput =
        getElement("orderAddress");


      if (nameInput) {

        sessionStorage.setItem(
          "orderName",
          nameInput.value.trim()
        );

      }


      if (phoneInput) {

        sessionStorage.setItem(
          "orderPhone",
          phoneInput.value.trim()
        );

      }


      if (addressInput) {

        sessionStorage.setItem(
          "orderAddress",
          addressInput.value.trim()
        );

      }


      sessionStorage.setItem(
        "orderQuantity",
        String(quantity)
      );

    });

  }


})();