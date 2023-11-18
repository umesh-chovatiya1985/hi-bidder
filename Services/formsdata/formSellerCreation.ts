const sellerNotificationForm = [
    {
        type: "toggle",
        formName: "lot_submitted",
        formLabel: "Lot submitted",
        subLabel: "Confirmation that we've received your lot",
        defaultChecked: true
    },
    {
        type: "toggle",
        formName: "lot_approved",
        formLabel: "Lot approved",
        subLabel: "Confirmation of your lot being approved",
        defaultChecked: false
    },
    {
        type: "toggle",
        formName: "adjustments_required",
        formLabel: "Adjustments required",
        subLabel: "Before your lot can be approved, it needs to be adjusted",
        defaultChecked: true
    },
    {
        type: "toggle",
        formName: "lots_planned",
        formLabel: "Lots planned",
        subLabel: "See your lots that are planned for auction",
        defaultChecked: false
    },
    {
        type: "toggle",
        formName: "lots_are_live",
        formLabel: "Lots are live",
        subLabel: "Letting you know when your lots are live in auction",
        defaultChecked: true
    },
    {
        type: "toggle",
        formName: "lot_results",
        formLabel: "Lot results",
        subLabel: "A daily overview showing how your lots have performed",
        defaultChecked: false
    },
    {
        type: "toggle",
        formName: "message_from_buyer",
        formLabel: "Message from buyer",
        subLabel: "When you receive a message from a potential buyer of one of your lots",
        defaultChecked: true
    }
];

export default sellerNotificationForm;