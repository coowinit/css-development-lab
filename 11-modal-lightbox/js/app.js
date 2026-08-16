(() => {
  const openButtons = document.querySelectorAll("[data-open-dialog]");
  const closeButtons = document.querySelectorAll("[data-close-dialog]");
  const dialogs = document.querySelectorAll("dialog");

  function syncBodyState() {
    const hasOpenDialog = [...dialogs].some((dialog) => dialog.open);
    document.body.classList.toggle("has-modal", hasOpenDialog);
  }

  openButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const dialogId = button.dataset.openDialog;
      const dialog = document.getElementById(dialogId);

      if (!dialog || typeof dialog.showModal !== "function") return;

      dialog.showModal();
      syncBodyState();
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const dialog = button.closest("dialog");
      if (dialog) dialog.close();
    });
  });

  dialogs.forEach((dialog) => {
    dialog.addEventListener("close", syncBodyState);

    // 点击 backdrop 区域关闭。
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
  });
})();
