import { element, by, ElementFinder } from 'protractor';

export class LevelDressageHisComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-level-dressage-his-my-suffix div table .btn-danger'));
    title = element.all(by.css('jhi-level-dressage-his-my-suffix div h2#page-heading span')).first();

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

export class LevelDressageHisUpdatePage {
    pageTitle = element(by.id('jhi-level-dressage-his-my-suffix-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    dateInput = element(by.id('field_date'));
    horseSelect = element(by.id('field_horse'));
    levelDressageSelect = element(by.id('field_levelDressage'));

    async getPageTitle() {
        return this.pageTitle.getText();
    }

    async setDateInput(date) {
        await this.dateInput.sendKeys(date);
    }

    async getDateInput() {
        return this.dateInput.getAttribute('value');
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

    async levelDressageSelectLastOption() {
        await this.levelDressageSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async levelDressageSelectOption(option) {
        await this.levelDressageSelect.sendKeys(option);
    }

    getLevelDressageSelect(): ElementFinder {
        return this.levelDressageSelect;
    }

    async getLevelDressageSelectedOption() {
        return this.levelDressageSelect.element(by.css('option:checked')).getText();
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

export class LevelDressageHisDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-levelDressageHis-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-levelDressageHis'));

    async getDialogTitle() {
        return this.dialogTitle.getText();
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
