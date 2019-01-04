import { element, by, ElementFinder } from 'protractor';

export class StableComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-stable-my-suffix div table .btn-danger'));
    title = element.all(by.css('jhi-stable-my-suffix div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getText();
    }
}

export class StableUpdatePage {
    pageTitle = element(by.id('jhi-stable-my-suffix-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    descriptionInput = element(by.id('field_description'));
    streetInput = element(by.id('field_street'));
    houseNumberInput = element(by.id('field_houseNumber'));
    postalcodeInput = element(by.id('field_postalcode'));
    cityInput = element(by.id('field_city'));
    countrySelect = element(by.id('field_country'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setStreetInput(street) {
        await this.streetInput.sendKeys(street);
    }

    async getStreetInput() {
        return this.streetInput.getAttribute('value');
    }

    async setHouseNumberInput(houseNumber) {
        await this.houseNumberInput.sendKeys(houseNumber);
    }

    async getHouseNumberInput() {
        return this.houseNumberInput.getAttribute('value');
    }

    async setPostalcodeInput(postalcode) {
        await this.postalcodeInput.sendKeys(postalcode);
    }

    async getPostalcodeInput() {
        return this.postalcodeInput.getAttribute('value');
    }

    async setCityInput(city) {
        await this.cityInput.sendKeys(city);
    }

    async getCityInput() {
        return this.cityInput.getAttribute('value');
    }

    async countrySelectLastOption() {
        await this.countrySelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async countrySelectOption(option) {
        await this.countrySelect.sendKeys(option);
    }

    getCountrySelect(): ElementFinder {
        return this.countrySelect;
    }

    async getCountrySelectedOption() {
        return this.countrySelect.element(by.css('option:checked')).getText();
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class StableDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-stable-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-stable'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
