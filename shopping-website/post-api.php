<?php
// تنظیم هدرها برای JSON
header('Content-Type: application/json');

// بررسی اینکه متد درخواست POST باشد
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // دریافت اطلاعات از بدنه درخواست
    $input = json_decode(file_get_contents('php://input'), true);

    // بررسی اینکه فیلدهای user_id و product_name یا product_id موجود باشند
    if (isset($input['user_id']) && isset($input['product_name'])) {
        $userId = $input['user_id'];
        $productName = $input['product_name'];

        try {
            // اتصال به دیتابیس
            $pdo = new PDO('mysql:host=localhost;dbname=my_shop', 'root', '');
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // گرفتن سبد خرید فعلی کاربر
            $stmt = $pdo->prepare("SELECT cart FROM users WHERE id = :id");
            $stmt->execute([':id' => $userId]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            // بررسی اینکه آیا کاربر سبد خریدی دارد یا خیر
            $cart = [];
            if ($user && $user['cart']) {
                $cart = json_decode($user['cart'], true);  // تبدیل JSON به آرایه
            }

            // اضافه کردن محصول جدید به سبد خرید
            $cart[] = $productName;

            // تبدیل آرایه به JSON برای ذخیره‌سازی در دیتابیس
            $cartJson = json_encode($cart);

            // آپدیت سبد خرید کاربر
            $stmt = $pdo->prepare("UPDATE users SET cart = :cart WHERE id = :id");
            $stmt->execute([':cart' => $cartJson, ':id' => $userId]);

            // پیام موفقیت‌آمیز بودن ذخیره‌سازی
            echo json_encode(['message' => 'Product added to cart successfully']);

        } catch (PDOException $e) {
            // در صورت بروز خطا
            echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['error' => 'Invalid input']);
    }
} else {
    echo json_encode(['error' => 'Invalid request method']);
}
