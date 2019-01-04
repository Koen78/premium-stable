import { element, by, ElementFinder } from 'protractor';

export class GenderComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-gender-my-suffix div table .btn-danger'));
    title = element.all(by.css('jhi-gender-my-suffix div h2#page-heading span')).first();

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

export class GenderUpdatePage {
    pageTitle = element(by.id('jhi-gender-my-suffix-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    genderInput = element(by.id('field_gender'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setGenderInput(gender) {
        await this.genderInput.sendKeys(gender);
    }

    async getGenderInput() {
        return this.genderInput.getAttribute('value');
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

export class GenderDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-gender-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-gender'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
