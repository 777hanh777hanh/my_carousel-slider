-   Trick để `Trình duyệt tính toán lại (reflow)`

    ```js
    const reflow = (element) => {
        element.offsetHeight;
    };
    ```

    -   trick này là do khi truy cập một số thuộc tính của một phần tử có thể kích hoạt trình duyệt thực hiện lại bố cục hoặc vẽ lại, những thao tác này cần thiết để cập nhật bố cục trực quan của trang.
    -   Thuộc tính `offsetHeight` được sử dụng để lấy chiều cao của một phần tử, bao gồm cả padding, border và thanh cuộn, nhưng không bao gồm margin. Khi truy cập vào `offsetHeight`, trình duyệt cần phải tính toán lại bố cục của trang, có thể bao gồm việc tính toán lại vị trí và kích thước của các phần tử khác trên trang.
    -   `reflow` ở đây giúp thay đổi CSS được áp dụng ngay tức thì mà không cần chờ cho đến khi trình duyệt thực hiện một reflow tự động sau một loạt các thay đổi

    -   ví dụ:

        ```js
        // nextItem -> display: none;

        nextItem.classList.add('carousel-item-next');
        // carousel-item-next -> display: block; translateX -> 100%

        // áp dụng css ngay lập tức
        reflow(nextItem);

        nextItem.classList.add('carousel-item-start');
        // carousel-item-start -> translateX -> -100%
        ```

        Tại ví dụ trên, nếu không có reflow khi nextItem chạy sang phải thì ta chỉ thấy item đứng yên và hiện lên.
        Do áp dụng reflow sau khi item chạy sang phải. Nên khi này item ở bên phải và áp dụng di chuyển sang trái. Ta sẽ thấy item chạy từ phải sang trái và áp dụng transition.
