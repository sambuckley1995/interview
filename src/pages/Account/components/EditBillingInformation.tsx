import "components/Packages/Packages.css";

export const EditBillingInformation = (): React.ReactElement => {
  return (
    <div className="packages-page-container">
      <h1>Billing Information</h1>
      <form className="modal-form">
        <label htmlFor="company-name">
          Company name
          <input
            name="company-name"
            type="text"
            placeholder="Enter your company name"
          />
        </label>
        <label htmlFor="email-address">
          Email address
          <input
            name="email-address"
            type="text"
            placeholder="Enter your email address"
          />
        </label>
        <label htmlFor="vat-number">
          VAT number
          <input
            name="vat-number"
            type="text"
            placeholder="Enter your VAT number"
          />
        </label>
        <div>
          <button type="submit" className="standard-button">
            Save
          </button>
          <button type="submit" className="standard-button text-button">
            Undo changes
          </button>
        </div>
      </form>
    </div>
  );
};
