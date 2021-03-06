/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PersonComponentsPage, PersonDeleteDialog, PersonUpdatePage } from './person-my-suffix.page-object';

const expect = chai.expect;

describe('Person e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let personUpdatePage: PersonUpdatePage;
    let personComponentsPage: PersonComponentsPage;
    let personDeleteDialog: PersonDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load People', async () => {
        await navBarPage.goToEntity('person-my-suffix');
        personComponentsPage = new PersonComponentsPage();
        expect(await personComponentsPage.getTitle()).to.eq('People');
    });

    it('should load create Person page', async () => {
        await personComponentsPage.clickOnCreateButton();
        personUpdatePage = new PersonUpdatePage();
        expect(await personUpdatePage.getPageTitle()).to.eq('Create or edit a Person');
        await personUpdatePage.cancel();
    });

    it('should create and save People', async () => {
        const nbButtonsBeforeCreate = await personComponentsPage.countDeleteButtons();

        await personComponentsPage.clickOnCreateButton();
        await promise.all([
            personUpdatePage.setNameInput('name'),
            personUpdatePage.setMobileInput('mobile'),
            personUpdatePage.setEmailInput('email'),
            personUpdatePage.languageParamSelectLastOption()
            // personUpdatePage.stablesSelectLastOption(),
            // personUpdatePage.horsesSelectLastOption(),
        ]);
        expect(await personUpdatePage.getNameInput()).to.eq('name');
        expect(await personUpdatePage.getMobileInput()).to.eq('mobile');
        expect(await personUpdatePage.getEmailInput()).to.eq('email');
        await personUpdatePage.save();
        expect(await personUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await personComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Person', async () => {
        const nbButtonsBeforeDelete = await personComponentsPage.countDeleteButtons();
        await personComponentsPage.clickOnLastDeleteButton();

        personDeleteDialog = new PersonDeleteDialog();
        expect(await personDeleteDialog.getDialogTitle()).to.eq('Are you sure you want to delete this Person?');
        await personDeleteDialog.clickOnConfirmButton();

        expect(await personComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
