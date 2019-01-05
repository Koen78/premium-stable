import { element, by, ElementFinder } from 'protractor';

export class ColorComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-color-my-suffix div table .btn-danger'));
    title = element.all(by.css('jhi-color-my-suffix div h2#page-heading span')).first();

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

export class ColorUpdatePage {
    pageTitle = element(by.id('jhi-color-my-suffix-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    colorInput = element(by.id('field_color'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setColorInput(color) {
        await this.colorInput.sendKeys(color);
    }

    async getColorInput() {
        return this.colorInput.getAttribute('value');
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

export class ColorDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-color-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-color'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
