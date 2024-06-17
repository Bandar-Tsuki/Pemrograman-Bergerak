# TomatoClassify

TomatoClassify is an application designed to classify tomato images using a pre-trained machine learning model.

## Prerequisites

Before running the application, ensure you have the following software installed:

- Python 3.10.11
- TensorFlow 2.15.0
- NumPy
- Pandas
- Flask
- Pillow
- flask_cors

## Installation Steps

Follow these steps to set up and run the application:

1. **Download the Model**

   Download the pre-trained model from the following link:
   [Tomato Classification Model](https://drive.google.com/file/d/10HXQ20ePv0-Looi3d3XXtIuK7vlDhfnQ/view?usp=sharing)

   Save the model to a known location on your system.

2. **Install Python**

   Ensure you have Python version 3.10.11 installed. You can download and install it from the [official Python website](https://www.python.org/downloads/release/python-31011/).

3. **Install Required Python Packages**

   Open a terminal or command prompt and run the following commands to install the required packages:

   ```sh
   pip install tensorflow==2.15.0
   pip install numpy
   pip install pandas
   pip install flask
   pip install pillow
   pip install flask_cors
   ```

4. **Update the Model Path in the Code**

   Open the main.py file and update the model loading line with the correct path to the downloaded model file:

   ```sh
   model = load_model(<path_to_your_model>)
   ```
   
   Replace <path_to_your_model> with the actual path where you saved the model.

5. **Run the Application**

   In the terminal or command prompt, navigate to the directory containing the main.py file and run the application using:
   
   ```sh
   python main.py
   ```
   
   The application should now be running, and you can access it according to the instructions provided in your main.py file.
