import { element, by, ElementFinder } from 'protractor';

export class VideoComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-video-my-suffix div table .btn-danger'));
    title = element.all(by.css('jhi-video-my-suffix div h2#page-heading span')).first();

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

export class VideoUpdatePage {
    pageTitle = element(by.id('jhi-video-my-suffix-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    dateInput = element(by.id('field_date'));
    descriptionInput = element(by.id('field_description'));
    youTubeUrlInput = element(by.id('field_youTubeUrl'));
    horseSelect = element(by.id('field_horse'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setDateInput(date) {
        await this.dateInput.sendKeys(date);
    }

    async getDateInput() {
        return this.dateInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setYouTubeUrlInput(youTubeUrl) {
        await this.youTubeUrlInput.sendKeys(youTubeUrl);
    }

    async getYouTubeUrlInput() {
        return this.youTubeUrlInput.getAttribute('value');
    }

    async horseSelectLastOption() {
        await this.horseSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async horseSelectOption(option) {
        await this.horseSelect.sendKeys(option);
    }

    getHorseSelect(): ElementFinder {
        return this.horseSelect;
    }

    async getHorseSelectedOption() {
        return this.horseSelect.element(by.css('option:checked')).getText();
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

export class VideoDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-video-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-video'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
