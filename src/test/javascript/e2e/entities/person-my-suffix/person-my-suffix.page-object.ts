import { element, by, ElementFinder } from 'protractor';

export class PersonComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-person-my-suffix div table .btn-danger'));
    title = element.all(by.css('jhi-person-my-suffix div h2#page-heading span')).first();

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

export class PersonUpdatePage {
    pageTitle = element(by.id('jhi-person-my-suffix-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    nameInput = element(by.id('field_name'));
    mobileInput = element(by.id('field_mobile'));
    emailInput = element(by.id('field_email'));
    languageParamSelect = element(by.id('field_languageParam'));
    stablesSelect = element(by.id('field_stables'));
    horsesSelect = element(by.id('field_horses'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setNameInput(name) {
        await this.nameInput.sendKeys(name);
    }

    async getNameInput() {
        return this.nameInput.getAttribute('value');
    }

    async setMobileInput(mobile) {
        await this.mobileInput.sendKeys(mobile);
    }

    async getMobileInput() {
        return this.mobileInput.getAttribute('value');
    }

    async setEmailInput(email) {
        await this.emailInput.sendKeys(email);
    }

    async getEmailInput() {
        return this.emailInput.getAttribute('value');
    }

    async languageParamSelectLastOption() {
        await this.languageParamSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async languageParamSelectOption(option) {
        await this.languageParamSelect.sendKeys(option);
    }

    getLanguageParamSelect(): ElementFinder {
        return this.languageParamSelect;
    }

    async getLanguageParamSelectedOption() {
        return this.languageParamSelect.element(by.css('option:checked')).getText();
    }

    async stablesSelectLastOption() {
        await this.stablesSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async stablesSelectOption(option) {
        await this.stablesSelect.sendKeys(option);
    }

    getStablesSelect(): ElementFinder {
        return this.stablesSelect;
    }

    async getStablesSelectedOption() {
        return this.stablesSelect.element(by.css('option:checked')).getText();
    }

    async horsesSelectLastOption() {
        await this.horsesSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async horsesSelectOption(option) {
        await this.horsesSelect.sendKeys(option);
    }

    getHorsesSelect(): ElementFinder {
        return this.horsesSelect;
    }

    async getHorsesSelectedOption() {
        return this.horsesSelect.element(by.css('option:checked')).getText();
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

export class PersonDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-person-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-person'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
