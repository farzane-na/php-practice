<?php
// تنظیمات اتصال به دیتابیس
$dsn = 'mysql:host=localhost;dbname=my_shop';  // نام دیتابیس و سرور
$username = 'root';  // نام کاربری دیتابیس
$password = '';  // رمز عبور دیتابیس

try {
    // اتصال به دیتابیس
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // بررسی اینکه آیا درخواست با متد POST ارسال شده است
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        // دریافت داده‌های ارسالی از سمت کاربر
        $userID = $_POST['userID'];
        $productID = $_POST['productID'];
        $count = $_POST['count'];

        // بررسی اینکه همه داده‌ها ارسال شده باشد
        if (!empty($userID) && !empty($productID) && !empty($count)) {
            // آماده‌سازی کوئری برای درج اطلاعات در جدول
            $stmt = $pdo->prepare("INSERT INTO cart (userID, productID, count) VALUES (:userID, :productID, :count)");
            $stmt->bindParam(':userID', $userID);
            $stmt->bindParam(':productID', $productID);
            $stmt->bindParam(':count', $count);

            // اجرای کوئری
            if ($stmt->execute()) {
                echo json_encode(['status' => 'success', 'message' => 'Product added to cart successfully']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Failed to add product to cart']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
        }
    }
    if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
        // دریافت داده‌های ارسالی از body درخواست
        $input = json_decode(file_get_contents('php://input'), true);

        // بررسی اینکه مقادیر مورد نیاز ارسال شده باشد
        if (isset($input['userID']) && isset($input['productID']) && isset($input['count'])) {
            $userID = $input['userID'];
            $productID = $input['productID'];
            $newCount = $input['count'];

            // آماده‌سازی کوئری برای به‌روزرسانی تعداد
            $stmt = $pdo->prepare("UPDATE cart SET count = :count WHERE userID = :userID AND productID = :productID");
            $stmt->bindParam(':count', $newCount);
            $stmt->bindParam(':userID', $userID);
            $stmt->bindParam(':productID', $productID);

            // اجرای کوئری
            if ($stmt->execute()) {
                echo json_encode(['status' => 'success', 'message' => 'Count updated successfully']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Failed to update count']);
            }
        } else {
            echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
        }
    }
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed: ' . $e->getMessage()]);
}
?>
