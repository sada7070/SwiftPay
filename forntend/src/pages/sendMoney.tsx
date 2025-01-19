export const SendMoney = () => {
  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 pt-6 pb-4">
            <h2 className="text-3xl font-bold text-center">Transfer Money</h2>
          </div>
          <div className="p-6">
            <div className="flex item-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">A</span>
              </div>
              <h3 className="text-2xl font-semibold mt-0.5">Friend's Name</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2 pt-0.5">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pl-0.5"
                  htmlFor="amount"
                >
                  Amount(in Rs)
                </label>
                <input
                  type="nummber"
                  className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="amount"
                  placeholder="Enter amount"
                />
              </div>
              <button className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
