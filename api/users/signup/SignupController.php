<?php
class SignupController
{
    private $db;
    private $requestMethod;

    public function __construct($db, $requestMethod)
    {
        $this->db = $db;
        $this->requestMethod = $requestMethod;
    }


    public function processRequest()
    {
        if ($this->requestMethod == 'POST') {
            $data = json_decode(file_get_contents("php://input"), true);
            if (empty($data)) {
                $this->registerUser($_POST);  //for form data
            } else {
                $this->registerUser($data);   // for raw data
            }
        } else {
            $response = [
                'status' => 405,
                'message' => $this->requestMethod . " Method Not Allowed"
            ];
            header('HTTP/1.0 405 Method Not Allowed');
            echo json_encode($response);
        }
    }

    private function errorResponse()
    {
        header("HTTP/1.1 404 Not Found");
        echo json_encode(array("message" => "Not Found"));
    }


    //function for user register

    private function registerUser($data)
    {
        $fullName = mysqli_real_escape_string($this->db, $data["fullName"]);
        $email = mysqli_real_escape_string($this->db, $data["email"]);

        $password = mysqli_real_escape_string($this->db, $data["password"]);

        if (empty(trim($fullName))) {
            return $this->error422("name field cannnot be empty");
        } elseif (empty(trim($email))) {

            return $this->error422("email field cannnot be empty");
        } elseif (empty(trim($password))) {

            return $this->error422("password field cannnot be empty");
        } else {
            if ($this->checkDuplicateEmail($email)) {
                $response = [
                    'status' => 409,
                    'message' => " Email Address Already Exists"
                ];
                header('HTTP/1.0 409  Email Address Already Exists');
                echo json_encode($response);
            } else {
                $hashed_password = password_hash($password, PASSWORD_DEFAULT);
                $sql = "INSERT INTO `users`(`full_name`,`email`,`password`) VALUES('$fullName','$email','$hashed_password')";
                $result = mysqli_query($this->db, $sql);
                if ($result) {
                    $response = [
                        'status' => 201,
                        'message' => "user registration successfull"
                    ];
                    header('HTTP/1.0 201 created');
                    echo json_encode($response);
                } else {
                    $response = [
                        'status' => 500,
                        'message' => " Internal Server Error"
                    ];
                    header('HTTP/1.0 500  Internal Server Error');
                    echo json_encode($response);
                }
            }
        }
    }


    //function for showing input validation error

    private function error422($msg)
    {
        $response = [
            'status' => 422,
            'message' => $msg
        ];
        header('HTTP/1.0 422 Could Not Process Empty Data.');
        echo json_encode($response);
        exit();
    }

    //function for checking if email already exists;

    private function checkDuplicateEmail($email)
    {
        $exist =  null;
        try {

            $sql = "SELECT * FROM `users` WHERE `email`='$email'";

            $result = $this->db->query($sql);

            if ($result->num_rows > 0) {
                $exist = true;
            } else {
                $exist = false;
            }
        } catch (Exception $e) {
            header("HTTP/1.1 500 Server Error");
            $response = array('message' => $e->getMessage());
            echo json_encode($response);
        }

        return $exist;
    }
}
