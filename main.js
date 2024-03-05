// Lấy danh sách các item trong carousel
const carouselItems = document.querySelectorAll('.carousel-item');

// Xác định hành động khi nhấn nút next
document.querySelector('.carousel-control-next').addEventListener('click', () => {
    // Tìm item hiện tại có class 'active'
    const currentItem = document.querySelector('.carousel-item.active');

    // Tìm item kế tiếp của item hiện tại
    const nextItem = currentItem.nextElementSibling;

    // Thêm class 'carousel-item-start' vào current item và next item
    nextItem.classList.add('carousel-item-next');
    reflow(nextItem);
    currentItem.classList.add('carousel-item-start');
    nextItem.classList.add('carousel-item-start');

    nextItem.addEventListener(
        'transitionend',
        () => {
            nextItem.classList.remove('carousel-item-start', 'carousel-item-next');
            nextItem.classList.add('active');

            currentItem.classList.remove('active');
        },
        { once: true },
    );
});

const reflow = (element) => {
    console.log('reflow');
    element.offsetHeight;
};

document.querySelector('.carousel-control-prev').addEventListener('click', () => {
    const currentItem = document.querySelector('.carousel-item.active');
    // const prevItem = currentItem.previousElementSibling;
    currentItem.classList.add('carousel-item-next');
    reflow(currentItem);
    currentItem.classList.add('carousel-item-start');
    // prevItem.classList.add('carousel-item-prev');
    // reflow(prevItem);
    // // currentItem.classList.add('carousel-item-start');
    // // prevItem.classList.add('carousel-item-start');

    // prevItem.addEventListener(
    //     'transitionend',
    //     () => {
    //         prevItem.classList.remove('carousel-item-start', 'carousel-item-prev');
    //         prevItem.classList.add('active');

    //         currentItem.classList.remove('active');
    //     },
    //     { once: true },
    // );
});
