// Hàm `reflow` làm cho trình duyệt layout lại
const reflow = (element) => {
    element.offsetHeight;
};

// Danh sách các carousel đang chuyển động
let listRedirecting = [];

// Hàm loại bỏ carousel khỏi danh sách chuyển động
const removeFromListRedirecting = (target) => {
    listRedirecting = listRedirecting.filter((item) => item !== target);
};

// Xử lý sự kiện khi nhấn nút "Next"
const allControlNext = document.querySelectorAll('.carousel-control-next');
allControlNext.forEach((item) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Kiểm tra xem carousel có trong danh sách chuyển động không
        if (!listRedirecting.includes(item.dataset.target)) {
            next(item.dataset.target);
        }
    });
});

// Xử lý sự kiện khi nhấn nút "Prev"
const allControlPrev = document.querySelectorAll('.carousel-control-prev');
allControlPrev.forEach((item) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Kiểm tra xem carousel có trong danh sách chuyển động không
        if (!listRedirecting.includes(item.dataset.target)) {
            prev(item.dataset.target);
        }
    });
});

// Hàm chuyển đến phần tử kế tiếp trong carousel
const next = (target) => {
    // Thêm carousel vào danh sách chuyển động
    listRedirecting.push(target);

    // Lấy carousel dựa vào biến target
    const carouselContainer = document.querySelector(target);
    // Kiểm tra xem carousel có tồn tại không
    if (carouselContainer) {
        // Lấy tất cả carousel-item trong carousel
        const carouselItems = carouselContainer.querySelectorAll('.carousel-item');

        // Kiểm tra xem có nhiều hơn 1 item trong carousel không
        if (carouselItems.length > 1) {
            // Tìm item hiện tại có class 'active'
            const currentItem = carouselContainer.querySelector('.carousel-item.active');

            // Tìm item kế tiếp của item hiện tại
            let nextItem = currentItem.nextElementSibling;
            if (!nextItem) {
                // Nếu không có item kết tiếp thì lấy item đầu tiên
                nextItem = carouselItems[0];
            }

            // Thêm class 'carousel-item-next' vào nextItem
            nextItem.classList.add('carousel-item-next');

            reflow(nextItem);

            // Thêm class 'carousel-item-start' vào current item và next item
            currentItem.classList.add('carousel-item-start');
            nextItem.classList.add('carousel-item-start');

            // Xử lý sự kiện khi chuyển động kết thúc
            nextItem.addEventListener(
                'transitionend',
                () => {
                    // xoá class 'carousel-item-start' của nextItem
                    nextItem.classList.remove('carousel-item-start', 'carousel-item-next');
                    // thêm class 'active' cho nextItem
                    nextItem.classList.add('active');

                    // xoá class 'active' và 'carousel-item-start' của currentItem
                    currentItem.classList.remove('active', 'carousel-item-start');

                    // xoá carousel trong list đang chuyển động
                    removeFromListRedirecting(target);
                },
                { once: true },
            );
        } else if (carouselItems.length > 0) {
            // khi chỉ có 1 item trong carousel
            directOnlyItem(target, 'next');
        }
    }
};

// Hàm chuyển đến phần tử trước đó trong carousel
const prev = (target) => {
    // Thêm carousel vào danh sách chuyển động
    listRedirecting.push(target);

    // Lấy carousel dựa vào biến target
    const carouselContainer = document.querySelector(target);
    // Kiểm tra xem carousel có tồn tại không
    if (carouselContainer) {
        // Lấy tất cả carousel-item trong carousel
        const carouselItems = carouselContainer.querySelectorAll('.carousel-item');

        // Kiểm tra xem có nhiều hơn 1 item trong carousel không
        if (carouselItems.length > 1) {
            // Tìm item hiện tại có class 'active'
            const currentItem = carouselContainer.querySelector('.carousel-item.active');

            // Tìm item kế tiếp của item hiện tại
            let prevItem = currentItem.previousElementSibling;
            if (!prevItem) {
                // Nếu không có item kết tiếp thì lấy item cuối cùng
                prevItem = carouselItems[carouselItems.length - 1];
            }

            // Thêm class 'carousel-item-prev' vào prevItem
            prevItem.classList.add('carousel-item-prev');

            reflow(prevItem);

            // Thêm class 'carousel-item-end' vào current item và prev item
            currentItem.classList.add('carousel-item-end');
            prevItem.classList.add('carousel-item-end');

            // Xử lý sự kiện khi chuyển động kết thúc
            prevItem.addEventListener(
                'transitionend',
                () => {
                    // xoá class 'carousel-item-end' của prevItem
                    prevItem.classList.remove('carousel-item-end', 'carousel-item-prev');
                    // thêm class 'active' cho prevItem
                    prevItem.classList.add('active');

                    // xoá class 'active' và 'carousel-item-end' của currentItem
                    currentItem.classList.remove('active', 'carousel-item-end');

                    // xoá carousel trong list đang chuyển động
                    removeFromListRedirecting(target);
                },
                { once: true },
            );
        } else if (carouselItems.length > 0) {
            // khi chỉ có 1 item trong carousel
            directOnlyItem(target, 'prev');
        }
    }
};

const directOnlyItem = (target, direction) => {
    // Lấy Carousel dựa vào biến target
    const carouselContainer = document.querySelector(target);
    // Kiểm tra xem carousel có tồn tại không
    if (carouselContainer) {
        // Lấy item hiện tại có class 'active'
        const currentItem = carouselContainer.querySelector('.carousel-item.active');
        // Clone item hiện tại
        const copyItem = currentItem.cloneNode(true);

        // Xoá class 'active' của item clone
        copyItem.classList.remove('active');

        // Lấy carousel-inner chứa các thẻ carousel-item
        const carouselInner = carouselContainer.querySelector('.carousel-inner');

        // Đặt item clone vào carousel-inner
        carouselInner.appendChild(copyItem);

        // Thêm class 'carousel-item-next' hoặc 'carousel-item-prev' vào item clone
        copyItem.classList.add(`carousel-item-${direction || ''}`);

        reflow(copyItem);

        // Nếu direction là 'next' thì thêm class 'carousel-item-start' vào item hiện tại và item clone
        if (direction === 'next') {
            currentItem.classList.add('carousel-item-start');
            copyItem.classList.add('carousel-item-start');

            // Xử lý sự kiện khi chuyển động kết thúc
            copyItem.addEventListener(
                'transitionend',
                () => {
                    // xoá class 'carousel-item-start' của item clone
                    copyItem.classList.remove('carousel-item-start', `carousel-item-${direction}`);
                    // thêm class 'active' cho item clone
                    copyItem.classList.add('active');
                    // xoá class 'active' và 'carousel-item-start' của item hiện tại
                    currentItem.classList.remove('active', 'carousel-item-start');

                    // xoá item hiện tại khỏi carousel-inner
                    carouselInner.removeChild(currentItem);

                    // xoá carousel trong list đang chuyển động
                    removeFromListRedirecting(target);
                },
                { once: true },
            );
        } else if ((direction = 'prev')) {
            // Nếu direction là 'prev' thì thêm class 'carousel-item-end' vào item hiện tại và item clone

            // Thêm class 'carousel-item-end' vào item hiện tại và item clone
            currentItem.classList.add('carousel-item-end');
            copyItem.classList.add('carousel-item-end');

            // Xử lý sự kiện khi chuyển động kết thúc
            copyItem.addEventListener(
                'transitionend',
                () => {
                    // xoá class 'carousel-item-end' của item clone
                    copyItem.classList.remove('carousel-item-end', 'carousel-item-prev');
                    // thêm class 'active' cho item clone
                    copyItem.classList.add('active');
                    // xoá class 'active' và 'carousel-item-end' của item hiện tại
                    currentItem.classList.remove('active', 'carousel-item-end');

                    // xoá item hiện tại khỏi carousel-inner
                    carouselInner.removeChild(currentItem);

                    // xoá carousel trong list đang chuyển động
                    removeFromListRedirecting(target);
                },

                // Chỉ bắt sự kiện 1 lần
                { once: true },
            );
        }
    }
};
