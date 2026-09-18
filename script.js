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

  function get(id) {
    return document.getElementById(id);
  }


  /* =========================================================
     COUNTDOWN
  ========================================================= */

  let totalSeconds = (5 * 3600) + (47 * 60) + 23;

  function updateCountdown() {
    const hours = get("hours");
    const minutes = get("minutes");
    const seconds = get("seconds");

    if (!hours || !minutes || !seconds) {
      return;
    }

    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    hours.textContent = String(h).padStart(2, "0");
    minutes.textContent = String(m).padStart(2, "0");
    seconds.textContent = String(s).padStart(2, "0");

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

  const notificationPopup = get("notifPopup");
  const notificationMessage = get("notifMsg");

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

  const mainProductImg = get("mainProductImg");

  document.querySelectorAll(".thumb-img").forEach(function (thumb) {
    thumb.addEventListener("click", function () {

      document.querySelectorAll(".thumb-img").forEach(function (item) {
        item.classList.remove("active");
      });

      thumb.classList.add("active");

      if (mainProductImg && thumb.dataset.img) {
        mainProductImg.src = thumb.dataset.img;
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

      const benefits = get("benefits");

      if (benefits) {
        benefits.scrollIntoView({
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

    const select = get("orderSize");

    if (select) {
      select.value = selectedSize;
    }

  }


  document.querySelectorAll(".size-btn").forEach(function (button) {

    button.addEventListener("click", function () {
      setSize(button.dataset.size);
    });

  });


  const orderSize = get("orderSize");

  if (orderSize) {

    orderSize.addEventListener("change", function (event) {

      setSize(event.target.value);

    });

  }


  /* =========================================================
     QUANTITY
  ========================================================= */

  function updateQuantity() {

    const total = PRICE * quantity;

    const qtyNum =
      get("qtyNum");

    const formQty =
      get("formQty");

    const formQtyNum =
      get("formQtyNum");

    const productQtyPrice =
      get("productQtyPrice");

    const formPrice =
      get("formPrice");

    const formQtyTotal =
      get("formQtyTotal");

    const orderQuantity =
      get("orderQuantity");


    if (qtyNum) {
      qtyNum.textContent =
        bnNumber(quantity);
    }


    if (formQty) {
      formQty.textContent =
        bnNumber(quantity);
    }


    if (formQtyNum) {
      formQtyNum.textContent =
        bnNumber(quantity);
    }


    if (productQtyPrice) {
      productQtyPrice.textContent =
        "মোট: " + money(total);
    }


    if (formPrice) {
      formPrice.textContent =
        money(total);
    }


    if (formQtyTotal) {
      formQtyTotal.textContent =
        "মোট: " + money(total);
    }


    /*
     * This hidden input is sent to WordPress.
     */
    if (orderQuantity) {
      orderQuantity.value =
        String(quantity);
    }

  }


  document.querySelectorAll("[data-qty]").forEach(function (button) {

    button.addEventListener("click", function () {

      const delta =
        Number(button.dataset.qty);

      if (Number.isNaN(delta)) {
        return;
      }

      quantity += delta;

      /*
       * Minimum quantity = 1
       * Maximum quantity = 5
       */
      if (quantity < 1) {
        quantity = 1;
      }

      if (quantity > 5) {
        quantity = 5;
      }

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

        const item =
          button.closest(".faq-item");

        if (!item) {
          return;
        }

        const wasOpen =
          item.classList.contains("open");


        /*
         * Close all opened FAQ items
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
         * Open selected FAQ
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
     ORDER FORM
  ========================================================= */

  const orderForm =
    get("orderForm");

  const submitButton =
    get("submitOrderBtn");


  if (orderForm) {

    orderForm.addEventListener(
      "submit",
      function (event) {

        /*
         * IMPORTANT:
         *
         * এখানে valid form-এর জন্য
         * preventDefault() ব্যবহার করবো না।
         *
         * Browser normal POST করবে:
         *
         * /wp-admin/admin-post.php
         *
         */


        /* -----------------------------------------------------
           HTML validation
        ----------------------------------------------------- */

        if (!orderForm.checkValidity()) {

          event.preventDefault();

          orderForm.reportValidity();

          return;

        }


        /* -----------------------------------------------------
           Get customer data
        ----------------------------------------------------- */

        const nameInput =
          get("orderName");

        const phoneInput =
          get("orderPhone");

        const addressInput =
          get("orderAddress");

        const sizeInput =
          get("orderSize");

        const quantityInput =
          get("orderQuantity");


        const customerName =
          nameInput
            ? nameInput.value.trim()
            : "";

        const customerPhone =
          phoneInput
            ? phoneInput.value.trim()
            : "";

        const customerAddress =
          addressInput
            ? addressInput.value.trim()
            : "";

        const customerSize =
          sizeInput
            ? sizeInput.value
            : "";



        /* -----------------------------------------------------
           Update selected size
        ----------------------------------------------------- */

        if (sizeInput) {

          selectedSize =
            sizeInput.value || "";

        }


        /* -----------------------------------------------------
           Update quantity
        ----------------------------------------------------- */

        if (quantityInput) {

          quantityInput.value =
            String(quantity);

        }


        /* -----------------------------------------------------
           Save information temporarily
           for success screen
        ----------------------------------------------------- */

        try {

          sessionStorage.setItem(
            "orderName",
            customerName
          );

          sessionStorage.setItem(
            "orderPhone",
            customerPhone
          );

          sessionStorage.setItem(
            "orderAddress",
            customerAddress
          );

          sessionStorage.setItem(
            "orderSize",
            customerSize
          );

          sessionStorage.setItem(
            "orderQuantity",
            String(quantity)
          );

        } catch (storageError) {

          console.warn(
            "Session storage unavailable:",
            storageError
          );

        }


        /* -----------------------------------------------------
           Prevent double clicking
        ----------------------------------------------------- */

        if (submitButton) {

          submitButton.disabled =
            true;

          submitButton.innerHTML =
            '<i class="fas fa-spinner fa-spin me-2"></i>' +
            'অর্ডার পাঠানো হচ্ছে...';

        }


        /*
         * VERY IMPORTANT:
         *
         * No event.preventDefault() here.
         *
         * The browser now sends:
         *
         * POST
         * ↓
         * https://ruqiyacare.ct.ws/wp-admin/admin-post.php
         *
         * with:
         *
         * action=github_ring_order
         * name=...
         * phone=...
         * address=...
         * size=...
         * quantity=...
         */

      }
    );

  }


  /* =========================================================
     SMOOTH SCROLL TO ORDER SECTION
  ========================================================= */

  document
    .querySelectorAll('a[href="#order"]')
    .forEach(function (link) {

      link.addEventListener("click", function (event) {

        event.preventDefault();

        const orderSection =
          get("order");

        if (orderSection) {

          orderSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }

      });

    });


  /* =========================================================
     SUCCESS URL HANDLER
  ========================================================= */

  const urlParams =
    new URLSearchParams(
      window.location.search
    );

  const orderStatus =
    urlParams.get("order");

  const orderId =
    urlParams.get("order_id");


  if (
    orderStatus === "success" &&
    orderId
  ) {

    /* -------------------------------------------------------
       Get stored customer information
    ------------------------------------------------------- */

    let savedName = "";
    let savedPhone = "";
    let savedAddress = "";
    let savedSize = "";
    let savedQuantity = "1";


    try {

      savedName =
        sessionStorage.getItem(
          "orderName"
        ) || "";

      savedPhone =
        sessionStorage.getItem(
          "orderPhone"
        ) || "";

      savedAddress =
        sessionStorage.getItem(
          "orderAddress"
        ) || "";

      savedSize =
        sessionStorage.getItem(
          "orderSize"
        ) || "";

      savedQuantity =
        sessionStorage.getItem(
          "orderQuantity"
        ) || "1";

    } catch (storageError) {

      console.warn(
        "Unable to read session storage:",
        storageError
      );

    }


    const savedQty =
      Number(savedQuantity) || 1;


    /* -------------------------------------------------------
       Success section
    ------------------------------------------------------- */

    const successSection =
      get("orderSuccess");

    const orderContent =
      get("orderContent");


    if (orderContent) {
      orderContent.classList.add("d-none");
    }


    if (successSection) {
      successSection.classList.remove("d-none");
    }


    /* -------------------------------------------------------
       Simple success box
    ------------------------------------------------------- */

    const successMessage =
      get("orderSuccessMessage");

    const successOrderId =
      get("successOrderId");


    if (successOrderId) {

      successOrderId.textContent =
        "#" + orderId;

    }


    if (successMessage) {

      successMessage.classList.remove(
        "d-none"
      );

    }


    /* -------------------------------------------------------
       Customer name
    ------------------------------------------------------- */

    const successName =
      get("successName");

    const successName2 =
      get("successName2");


    if (successName) {

      successName.textContent =
        savedName;

    }


    if (successName2) {

      successName2.textContent =
        savedName;

    }


    /* -------------------------------------------------------
       Customer phone
    ------------------------------------------------------- */

    const successPhone =
      get("successPhone");


    if (successPhone) {

      successPhone.textContent =
        savedPhone;

    }


    /* -------------------------------------------------------
       Customer address
    ------------------------------------------------------- */

    const successAddress =
      get("successAddress");


    if (successAddress) {

      successAddress.textContent =
        savedAddress;

    }


    /* -------------------------------------------------------
       Quantity
    ------------------------------------------------------- */

    const successQty =
      get("successQty");


    if (successQty) {

      successQty.textContent =
        bnNumber(savedQty);

    }


    /* -------------------------------------------------------
       Total
    ------------------------------------------------------- */

    const successTotal =
      get("successTotal");


    if (successTotal) {

      successTotal.textContent =
        money(PRICE * savedQty);

    }


    /* -------------------------------------------------------
       Ring size
    ------------------------------------------------------- */

    const successSize =
      get("successSize");


    if (successSize) {

      successSize.textContent =
        savedSize || "পরে জানাবেন";

    }


    /* -------------------------------------------------------
       Scroll to success section
    ------------------------------------------------------- */

    setTimeout(function () {

      if (successSection) {

        successSection.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

      } else if (successMessage) {

        successMessage.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });

      }

    }, 300);

  }


})();
