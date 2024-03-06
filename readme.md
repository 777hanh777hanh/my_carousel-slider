# My Carousel

-   carousel: có class 'carousel' và id
-   carousel-inner: chứa các 'carousel-item'
-   'carousel-item' có chứa active sẽ được hiển thị lên
-   nút có class 'carousel-control-prev' di chuyển sang trái
-   nút có class 'carousel-control-next' di chuyển sang phải
-   mỗi nút di chuyển phải có property `data-target` có giá trị là **`id` của carousel**

```html
<div id="carouselExampleId" class="carousel slide">
    <div class="carousel-inner">
        <div class="carousel-item active">
            <h2>Item 1</h2>
        </div>
        <div class="carousel-item">
            <h2>Item 2</h2>
        </div>
        <div class="carousel-item">
            <h2>Item 3</h2>
        </div>
    </div>
    <button class="carousel-control-prev" type="button" data-target="#carouselExampleId">
        <span>Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-target="#carouselExampleId">
        <span>Next</span>
    </button>
</div>
```

<br />
<hr />

## [View demo](https://777hanh777hanh.github.io/my_carousel-slider/)
