import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank {
  stable var currentValue: Float = 300;
  stable var starttime = Time.now();

  public query func checkBalance(): async Float {
    return currentValue;
  };

  public func topUp(amount: Float): async () {
    currentValue += amount;
    Debug.print("Top Up: " # debug_show(currentValue));
  };

  public func withDraw(amount: Float): async () {
    if (amount <= currentValue) {
      currentValue -= amount;
      Debug.print("Withdraw: " # debug_show(currentValue));
    } else {
      Debug.print("Error: insufficient balance");
    }
  };

 public func compound(): async () {
  let currentTime = Time.now();
  let timeElapsed = currentTime - starttime;
  let secondsElapsed = timeElapsed / 1000000000;
currentValue := currentValue * Float.pow(1.00001, Float.fromInt(secondsElapsed));

  starttime := currentTime;


  Debug.print("Compounded balance: " # debug_show(currentValue));
};

}
