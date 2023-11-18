const buyerNotificationForm: any = [
    {
        type: "toggle",
        formName: "lot_won",
        formLabel: "Lot won",
        subLabel: "When you've won a lot at auction",
        defaultChecked: false
    },
    {
        type: "toggle",
        formName: "outbid",
        formLabel: "Outbid",
        subLabel: "When you're no longer the highest bidder",
        defaultChecked: true
    },
    {
        type: "toggle",
        formName: "seller_message",
        formLabel: "Message from seller",
        subLabel: "When you receive a message from the seller of a lot you're interested in",
        defaultChecked: false
    }
];

export default buyerNotificationForm;