import { element, by, ElementFinder } from 'protractor';

export class RaceComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-race-my-suffix div table .btn-danger'));
    title = element.all(by.css('jhi-race-my-suffix div h2#page-heading span')).first();

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

export class RaceUpdatePage {
    pageTitle = element(by.id('jhi-race-my-suffix-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    descriptionInput = element(by.id('field_description'));
    dateInput = element(by.id('field_date'));
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

    async setDateInput(date) {
        await this.dateInput.sendKeys(date);
    }

    async getDateInput() {
        return this.dateInput.getAttribute('value');
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

export class RaceDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-race-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-race'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
