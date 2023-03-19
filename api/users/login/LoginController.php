<?php
class LoginController
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
                $this->loginUser($_POST);  //for form data
            } else {
                $this->loginUser($data);   // for raw data
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


    //function for user login

    private function loginUser($data)
    {
        $email = mysqli_real_escape_string($this->db, $data["email"]);

        $password = mysqli_real_escape_string($this->db, $data["password"]);

        if (empty(trim($email))) {

            return $this->error422("email field cannnot be empty");
        } elseif (empty(trim($password))) {

            return $this->error422("password field cannnot be empty");
        } else {
            $this->verifyCredentials($email, $password);
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

    private function verifyCredentials($email, $password)
    {
        try {

            $sql = "SELECT * FROM `users` WHERE `email`='$email'";

            $result = mysqli_query($this->db, $sql);

            if ($result->num_rows == 1) {
                $row = mysqli_fetch_assoc($result);
                $check_password = password_verify($password, $row["password"]);
                $user = new stdClass();
                $user->name = $row["full_name"];
                $user->id = $row["id"];
                $user->email = $row["email"];
                if ($check_password) {
                    $response = [
                        'status' => 200,
                        'success' => true,
                        'message' => "you have succesfully logged in",
                        'user' => json_encode($user)
                    ];
                    header('HTTP/1.0 200 login successfull');
                    echo json_encode($response);
                    exit();
                } else {
                    $response = [
                        'status' => 401,
                        'success' => false,
                        'message' => "Credentials do not match"
                    ];
                    header('HTTP/1.0 401 Authentication Failed');
                    echo json_encode($response);
                    exit();
                }
            } else {
                $response = [
                    'status' => 404,
                    'success' => false,
                    'message' => "Email Address does not Exists"

                ];
                header('HTTP/1.0 404 Such user does not exists');
                echo json_encode($response);
                exit();
            }
        } catch (Exception $e) {
            header("HTTP/1.1 500 Server Error");
            $response = array('message' => $e->getMessage());
            echo json_encode($response);
        }
    }
}
